variable "project_name" {
  type        = string
  description = "Project Name"
  default     = "qtdealz"
}

variable "region" {
  type        = string
  description = "AWS Region. i.e., us-east-1"
}

variable "access_token" {
  type        = string
  description = "Github personal access token"
  sensitive   = true
}

variable "github_repository_url" {
  type        = string
  description = "Github repository url"
  default     = "https://github.com/MejanH/qtdealz-nextjs"
}

variable "stage" {
  type        = string
  description = "Branch State"
}

variable "auto_build" {
  type        = bool
  description = "Enables auto building for the branch"
}

variable "environment" {
  type        = string
  description = "Project environment"
}

variable "domain_name" {
  type        = string
  description = "Domain url"
}

variable "terraform_state_bucket" {
  type        = string
  description = "bucket name for terraform backend s3"
  default     = "qtdealz-website-terraform-state"
}
