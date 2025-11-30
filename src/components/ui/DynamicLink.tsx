'use client';

import Link, { LinkProps } from 'next/link';
import React, { useEffect, useState } from 'react';
import { getBasePath } from '@/utils/url';

interface DynamicLinkProps extends LinkProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const DynamicLink: React.FC<DynamicLinkProps> = ({ href, children, ...props }) => {
    const [path, setPath] = useState(href);

    useEffect(() => {
        const base = getBasePath();
        if (base && typeof href === 'string' && href.startsWith('/')) {
            setPath(`${base}${href}`);
        }
    }, [href]);

    return (
        <Link href={path} {...props}>
            {children}
        </Link>
    );
};
