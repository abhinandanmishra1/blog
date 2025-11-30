export const getBasePath = (): string => {
    if (typeof window === 'undefined') return '';
    // Check if we are running under the portfolio domain/path
    // This assumes the portfolio rewrites to /blog
    if (window.location.pathname.startsWith('/blog')) {
        return '/blog';
    }
    return '';
};

export const getDynamicPath = (path: string): string => {
    const basePath = getBasePath();
    // Ensure we don't double slash
    if (basePath && path.startsWith('/')) {
        return `${basePath}${path}`;
    }
    return path;
};
