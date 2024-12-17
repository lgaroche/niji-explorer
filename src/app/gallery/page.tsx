"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AlephHttpClient } from "@aleph-sdk/client";
import { PostResponse } from "@aleph-sdk/message";
import Link from "next/link";
import { IDCardContent } from "@/model";

export default function Gallery() {

    const [cards, setCards] = useState([...Array(10_000)])
    const [messages, setMessages] = useState<PostResponse<IDCardContent>[]>([...Array(10_000)])

    useEffect(() => {
        const client = new AlephHttpClient()
        const fetchMessages = async () => {
            const messages = await client.getPosts({
                addresses: [process.env.NEXT_PUBLIC_ALEPH_ADDRESS ?? "0xCF9D0C55aA2C0CC35f9E31Cb1075C9aDdF2B8216"],
                types: "reveal-for-id-card",
                pagination: 10_000
            })
            console.log(messages)
            setMessages(messages.posts)
        }
        fetchMessages()
    }, [])

    useEffect(() => {
        const cards = [...Array(10_000)]
        for (const message of messages) {
            //console.log(message)
            const id = parseInt((message as unknown as { ref: string }).ref.split(":")[1])
            cards[id] = message.content.image.replace("ipfs://", "https://ipfs.bytes32.net/ipfs/")
        }
        setCards(cards)
    }, [messages])


    return (
        <div className="m-auto flex flex-wrap justify-center items-center min-h-screen">
            {Array(10_000).map((_, index) => (
                <Link href={`/details/?tokenId=${index}`} key={index}>
                    <Image alt={`card${index}`} width={16} height={20} src={cards[index] ?? `/placeholder_single.png`} key={index} />
                </Link>
            ))}
        </div>
    )
}