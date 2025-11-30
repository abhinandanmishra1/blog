export const getBasePath = (): string => {
    if (typeof window === 'undefined') return '';
    if (window.location.pathname.startsWith('/blog')) {
        return '/blog';
    }
    return '';
};

export const getDynamicPath = (path: string): string => {
    const basePath = getBasePath();
    if (basePath && path.startsWith('/')) {
        return `${basePath}${path}`;
    }
    return path;
};
