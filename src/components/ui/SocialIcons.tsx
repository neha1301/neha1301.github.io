import type { ComponentProps } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type GithubProps = ComponentProps<typeof FaGithub>;
type LinkedinProps = ComponentProps<typeof FaLinkedin>;

/** Official brand marks — lucide v1 no longer ships brand icons. */
export function GithubIcon({ className, ...rest }: GithubProps) {
  return <FaGithub className={className} {...rest} aria-hidden="true" />;
}

export function LinkedinIcon({ className, ...rest }: LinkedinProps) {
  return <FaLinkedin className={className} {...rest} aria-hidden="true" />;
}
