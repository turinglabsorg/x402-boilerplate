declare module "x402-express" {
  export type Network = "base-sepolia" | "base" | string;

  export interface PaymentMiddlewareOptions {
    url?: string;
    [key: string]: any;
  }

  export interface RouteConfig {
    price: string;
    network: Network;
    [key: string]: any;
  }

  export type RoutesConfig = {
    [route: string]: RouteConfig;
  };

  export function paymentMiddleware(
    receivingAddress: string,
    routesConfig: RoutesConfig,
    options?: PaymentMiddlewareOptions
  ): any;
}
