provider "aws" {
  region                   = var.region
  shared_config_files      = ["~/.aws/config"]
  shared_credentials_files = ["~/.aws/credentials"]
  profile                  = "qtdealz-terraform"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  backend "s3" {
    bucket  = "qtdealz-website-terraform-state"
    key     = "network/terraform.tfstate"
    region  = "us-east-1"
    profile = "qtdealz-terraform"
  }
}

module "frontend" {
  source                 = "./modules/frontend"
  environment            = var.environment
  project_name           = var.project_name
  github_repository_url  = var.github_repository_url
  access_token           = var.access_token
  auto_build             = var.auto_build
  domain_name            = var.domain_name
  stage                  = var.stage
  terraform_state_bucket = var.terraform_state_bucket
  region                 = var.region
}
