import { useNavigate } from "react-router-dom"

export default function NotFoundPage() {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
            <div className="text-center max-w-md mx-auto">
                <div className="flex justify-center mb-6">
                    <div className="relative h-24 w-24 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                        <span className="font-bold text-white text-2xl">404</span>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Página Não Encontrada</h1>

                <p className="text-lg text-gray-600 mb-8">
                    Desculpe, a página que você está procurando não existe ou foi movida para outro endereço.
                </p>

                <button
                    onClick={handleGoBack}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <span className="mr-2">&#8592;</span>
                    <span>Voltar para a página anterior</span>
                </button>
            </div>

            <div className="mt-16 text-sm text-gray-500">
                <p>Se você acredita que isso é um erro, por favor entre em contato com o suporte.</p>
            </div>
        </div>
    )
}