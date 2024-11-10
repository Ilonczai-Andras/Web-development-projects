function Main() {
    return (
        <div className="pt-20 bg-gray-900 text-white h-screen overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Anime list */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Anime List</h2>
                    {/* List for animes */}
                    <div className="space-y-2">
                        {/* Individual anime items go here */}
                        <div className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
                            Example Anime
                        </div>
                    </div>
                </div>

                {/* Manga list */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Manga List</h2>
                    {/* List for mangas */}
                    <div className="space-y-2">
                        {/* Individual manga items go here */}
                        <div className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
                            Example Manga
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
