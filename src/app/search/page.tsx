
export default function Search() {
    return (
        <div className="flex justify-center items-center h-screen">
            <form className="flex flex-col gap-4" action="/details" method="GET">
                <input
                    name="tokenId"
                    className="border border-gray-200 rounded-md p-2 bg-blue-950 text-white"
                    type="text"
                    placeholder="Search" />
                <button
                    className="bg-blue-950 text-white p-2 rounded-md"
                    type="submit">
                    Search
                </button>
            </form>
        </div>
    )
}