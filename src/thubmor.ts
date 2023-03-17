import { sign } from "./sign";
import { BuildUrlOptions, buildUrl } from "./url";

type ThumborOptions = {
  /** The URL of your server. */
  endpoint: string;
  /** The security key used for HMAC signatures. */
  key: string;
};

export class Thumbor {
  private endpoint: string;
  private key: string;

  constructor(options: ThumborOptions) {
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
