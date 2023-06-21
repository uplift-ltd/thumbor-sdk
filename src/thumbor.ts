import { sign } from "./sign";
import { BuildUrlOptions, buildUrl } from "./url";

export type ThumborOptions = {
  /** The URL of your server. */
  endpoint: string;
  /** The security key used for HMAC signatures. */
  key: string;
};

export class Thumbor {
  private endpoint: string;
  private key: string;

  constructor(options: ThumborOptions) {
    if (!options.key) {
      throw new Error(
        "A key was not provided to Thumbor. Please use UnsafeThumbor on the frontend."
      );
    }
    this.endpoint = options.endpoint;
    this.key = options.key;
  }

  sign(path: string, options: BuildUrlOptions) {
    const url = buildUrl(path, options);
    const hash = sign(url, this.key);
    return hash;
  }

  url(path: string, options: BuildUrlOptions) {
    const url = buildUrl(path, options);
    const hash = sign(url, this.key);
    return `${this.endpoint}/${hash}/${url}`;
  }
}

export type UnsafeThumborOptions = Omit<ThumborOptions, "key">;

export class UnsafeThumbor {
  private endpoint: string;

  constructor(options: UnsafeThumborOptions) {
    this.endpoint = options.endpoint;
  }

  url(path: string, options: BuildUrlOptions) {
    const url = buildUrl(path, options);
    return `${this.endpoint}/unsafe/${url}`;
  }
}
