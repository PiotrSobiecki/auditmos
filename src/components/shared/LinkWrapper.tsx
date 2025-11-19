import { FC, PropsWithChildren } from 'react'

interface LinkWrapperProps {
  href: string;
  className?: string;
}

const LinkWrapper: FC<PropsWithChildren<LinkWrapperProps>> = ({ href, className, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer" 
    className={className}
  >
    {children}
  </a>
)

export default LinkWrapper 