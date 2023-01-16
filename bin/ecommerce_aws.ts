#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ECommerceApiStack } from "../lib/ecommerceApi-stack";
import { ProductsAppStack } from "../lib/productsApp-stack";

const app = new cdk.App();

const env: cdk.Environment = {
  account: "230038317155",
  region: "us-east-1",
};

const tags = {
  cost: "ECommerce",
};

const productsAppStack = new ProductsAppStack(app, "ProductsApp", {
  tags,
  env,
});

const eCommerceApiStack = new ECommerceApiStack(app, "ECommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  tags: tags,
  env,
});

eCommerceApiStack.addDependency(productsAppStack)
