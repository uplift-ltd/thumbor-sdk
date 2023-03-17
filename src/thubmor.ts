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

  sign(str: string) {
    return sign(str, this.key);
  }

  url(path: string, options: BuildUrlOptions) {
    const url = buildUrl(path, options);
    const hash = this.sign(url);
    return `${this.endpoint}/${hash}/${url}`;
  }
}
