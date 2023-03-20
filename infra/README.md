### Terraform

- the backend state will back up in a `us-east-1` s3 bucket.

## installation

- Need to follow the recommended github authentication. Check to generate personal access with the region GitHub app from here: https://docs.aws.amazon.com/amplify/latest/userguide/setting-up-GitHub-access.html
- delete existing apps where they have the associated domain.
- comment cloudfront custom role config in amplify config when deploying for the first and later update it. you can also comment the "\_LIVE_UPDATES" environment variable which was added later by using `terraform plan` for not to overwrite the amplify default generated config.
- `terraform init -var-file="ci.tfvars"`
- `terraform plan -var-file="ci.tfvars"`. check if all the changes are being displayed correctly
- `terraform apply -var-file="ci.tfvars"`
- **Important**
  - after successfully going live, don't try `terraform apply` again.
  - run init and plan again to see the changes. amplify adds some important default configuration.
  - update terraform config according to the diff. for example, custom role, env variables, etc.
  - **the summary is always is `terraform plan` to see the **changes before **applying**.\*\*\*\*

## Controlled deploy

Terraform setups Amplify webhook. Just copy the curl command from amplify build settings and run from the terminal. It will deploy the latest commit.

## Shared

Create terraform backend s3 for state backup

- not using versioning to reduce billing
- `terraform init` and `terraform apply`
