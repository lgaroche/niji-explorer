import { AlephHttpClient } from '@aleph-sdk/client';
import { DateTime } from 'luxon';
import Link from "next/link";
import NijiImage from "./nijiImage";

export default async function Home({ searchParams, }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { page } = await searchParams
  const currentPage = parseInt(page as string) || 1
  const client = new AlephHttpClient()
  const response = await client.getPosts({
    addresses: [process.env.NEXT_PUBLIC_ALEPH_ADDRESS || "0xCF9D0C55aA2C0CC35f9E31Cb1075C9aDdF2B8216"],
    types: "reveal-for-id-card",
    pagination: 6,
    page: currentPage
  })
  const total = response.pagination_total

  const cards = response.posts.map(post => ({
    id: post.item_hash,
    time: DateTime.fromSeconds(post.time).toRelative({ locale: "en" }),
    name: post.content.name,
    image: post.content.image.replace("ipfs://", "https://ipfs.aleph.im/ipfs/")
  }))

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div className="flex gap-4 items-center">
          <Link href={`/?page=${currentPage - 1}`}>
            <p className="text-gray-200 font-bold">{"<<"}</p>
          </Link>
          <p className="text-gray-200 font-bold">{currentPage} / {Math.ceil(total / 6)}</p>
          <Link href={`/?page=${currentPage + 1}`}>
            <p className="text-gray-200 font-bold">{">>"}</p>
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          {cards.map(card => (
            <div
              key={card.id}
              className="flex flex-col items-center">
              <Link href={`/details/hash/${card.id}`}>
                <NijiImage
                  src={card.image}
                  alt={card.name}
                  width={177}
                  height={272}
                />
              </Link>
              <p className="text-sm text-gray-200">{card.time}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
