resource "aws_iam_role" "amplify_role" {
  name = "amplify_deploy_terraform_role"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "amplify.amazonaws.com"
        },
        "Action" : "sts:AssumeRole"
      }
    ]
  })

  tags = {
    "Environment" = var.environment
    "Project"     = var.project_name
  }
}

resource "aws_iam_role_policy" "amplify_role_policy" {
  name = "amplify_iam_role_policy"
  role = aws_iam_role.amplify_role.id

  policy = file("${path.module}/amplify_role_policies.json")
}

resource "aws_amplify_app" "qtdealz" {
  name         = var.project_name
  repository   = var.github_repository_url
  access_token = var.access_token

  # The default build_spec added by the Amplify Console for Nextjs.
  build_spec = file("${path.module}/build_setting.yml")

  enable_auto_branch_creation = true
  enable_branch_auto_build    = true
  enable_branch_auto_deletion = true
  # The default patterns added by the Amplify Console.
  auto_branch_creation_patterns = [
    "*",
    "*/**",
  ]
  platform             = "WEB_DYNAMIC"
  iam_service_role_arn = aws_iam_role.amplify_role.arn

  # The default rewrites and redirects added by the Amplify Console.
  custom_rule {
    source = "/<*>"
    status = "404-200"
    target = "/index.html"
  }

  custom_rule {
    source = "https://${var.domain_name}"
    status = "302"
    target = "https://www.${var.domain_name}"
  }

  #Comment this on the first run, trigger a build of your branch, This will added automatically on the console after deployment. Add it here to ensure your subsequent terraform runs don't break your amplify deployment.
  #   custom_rule {
  #     source = "/<*>"
  #     status = "200"
  #     target = "https://<*>.cloudfront.net/<*>" 
  #   }

  environment_variables = {
    "NEXT_PUBLIC_CONFIG"                         = "qtdealz"
    "NEXT_PUBLIC_URL"                            = "https://www.${var.domain_name}"
    "RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED" = "false"
  }
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.qtdealz.id
  branch_name = "main"

  enable_auto_build = var.auto_build

  framework = "Next.js - SSR"
  stage     = var.stage
}

resource "aws_amplify_webhook" "main" {
  app_id      = aws_amplify_app.qtdealz.id
  branch_name = aws_amplify_branch.main.branch_name
  description = "triggermaster"
}

resource "aws_amplify_domain_association" "main" {
  app_id                = aws_amplify_app.qtdealz.id
  domain_name           = var.domain_name
  wait_for_verification = false

  # https://---.co
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  # https://www.---.co
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }
}
