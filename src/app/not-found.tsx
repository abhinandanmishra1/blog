import { DynamicLink } from '@/components/ui/DynamicLink'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-zinc-100">Page Not Found</h2>
            <p className="text-zinc-400 mb-8">Could not find requested resource</p>
            <DynamicLink
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Return Home
            </DynamicLink>
        </div>
    )
}
