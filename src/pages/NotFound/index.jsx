function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">404 - Página Não Encontrada</h1>
            <p className="mt-4 text-gray-600">Desculpe, a página que você está procurando não existe.</p>
            <a href="/" className="mt-6 text-blue-500 hover:underline">
                Voltar para a página inicial
            </a>
        </div>
    )
}

export default NotFoundPage;