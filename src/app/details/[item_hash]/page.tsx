import { AlephHttpClient } from "@aleph-sdk/client";
import Link from "next/link";
import NijiImage from "@/app/nijiImage";

interface MessageContent {
    address: string
    time: number
    content: IDCardContent
    ref: string
    type: string
}

interface Attributes {
    trait_type: string
    value: string
}

interface IDCardContent {
    name: string
    image: string
    attributes: Attributes[]
}

export default async function Details({ params }: { params: Promise<{ item_hash: string }> }) {
    const { item_hash } = await params;
    const client = new AlephHttpClient();
    const message = await client.getMessage(item_hash)
    const { content: idCard, ref } = message.content as MessageContent
    const id = ref.split(":")[1]
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
                    <p className="text-sm text-gray-200 font-bold">ID: {id}</p>
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