import { AlephHttpClient } from "@aleph-sdk/client";
import Image from "next/image";
import Link from "next/link";
import NijiImage from "@/app/nijiImage";
import { IDCardContent } from "@/model";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const NotFound = ({ message }: { message: string }) => (
    <div className="m-auto flex flex-col justify-center items-center min-h-screen">
        <p className="text-2xl font-bold mb-4">{message}</p>
        <Image
            className="drop-shadow-xl hover:drop-shadow-2xl"
            alt={"Unrevealed"}
            src={"/placeholder_single.png"}
            width={212}
            height={325}
        />
    </div>
)


export default async function Token({ searchParams }: Readonly<{ searchParams: SearchParams }>) {
    const { tokenId } = await searchParams
    if (isNaN(parseInt(tokenId as string))) {
        return <NotFound message="ID Card not found" />
    }
    const client = new AlephHttpClient()
    const postResponse = await client.getPosts({
        addresses: [process.env.NEXT_PUBLIC_ALEPH_ADDRESS || "0xCF9D0C55aA2C0CC35f9E31Cb1075C9aDdF2B8216"],
        types: "reveal-for-id-card",
        refs: [`ubisoft-niji-warrior:${tokenId}`],
    })
    console.log(postResponse)
    if (postResponse.posts.length === 0) {
        return <NotFound message={`ID Card ${tokenId} not revealed yet`} />
    }
    console.log(postResponse.posts[0].content)
    const idCard = postResponse.posts[0].content as IDCardContent
    console.log(idCard)
    const ens = idCard.name.split(" ").join("-").toLowerCase()
    const ensLink = `https://app.ens.domains/${ens}.edenonline.eth`

    return (
        <div className="m-auto flex justify-center items-center min-h-screen">
            <div className="flex p-3">
                <div>
                    <NijiImage
                        src={idCard.image}
                        alt={idCard.name}
                        width={212}
                        height={325}
                    />
                </div>
                <div className="flex flex-col p-3 space-y-2">
                    <p className="text-2xl font-bold">{idCard.name}</p>
                    <p className="text-sm text-gray-200 font-bold">ID: {tokenId}</p>
                    <Link
                        href={ensLink}
                        className="text-sm text-gray-200 font-bold">{ens}.edenonline.eth
                    </Link>
                    {idCard.attributes.map(({ trait_type, value }) => (
                        <div key={trait_type} className="bg-slate-800 rounded-sm px-2 py-1 font-bold">{trait_type}: {value}</div>
                    ))}

                </div>

            </div>
        </div>
    )
}