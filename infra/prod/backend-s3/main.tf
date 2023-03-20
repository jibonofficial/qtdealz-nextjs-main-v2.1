terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region                   = "us-east-1"
  shared_config_files      = ["~/.aws/config"]
  shared_credentials_files = ["~/.aws/credentials"]
  profile                  = "qtdealz-terraform"
}

resource "aws_s3_bucket" "tfstate" {
  bucket = "qtdealz-terraform-state"

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Project_Name = "Qtdealz"
  }
}

resource "aws_s3_bucket_acl" "tfstate_acl" {
  bucket = aws_s3_bucket.tfstate.id
  acl    = "private"
}
