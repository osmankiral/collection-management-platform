"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCollections } from "@/features/collections/collectionSlice";
import { SquareMousePointer } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Spinner from "@/components/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useSession } from "next-auth/react";
import Link from "next/link";

const CollectionsPage = () => {
  const dispatch = useAppDispatch();
  const { collections, meta, loading, error } = useAppSelector(
    (state) => state.collections
  );

  const [page, setPage] = useState(1);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      dispatch(
        fetchCollections({ page, accessToken: session.accessToken as string })
      );
    }
  }, [dispatch, page, session, status]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "unauthenticated") {
    return <p>Giriş yapmanız gerekiyor.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen px-6">
      <h1 className="text-2xl font-bold mb-6">Koleksiyonlar</h1>

      {error && <p className="text-red-500">Hata: {error}</p>}

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Ürün Koşulları</TableHead>
                  <TableHead>Satış Kanalı</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {collections.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.info.name}</TableCell>

                    <TableCell
                      dangerouslySetInnerHTML={{
                        __html: item.info.description,
                      }}
                    />

                    <TableCell>Satış Kanalı - {item.salesChannelId}</TableCell>

                    <TableCell>
                      <Link href={`/dashboard/collections/${item.id}`}>
                        <button
                          className="relative group hover:text-blue-800 ml-5 cursor-pointer"
                          aria-label={`Düzenle ${item.info.name}`}
                        >
                          <SquareMousePointer size={24} />
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                            Sabitleri Düzenle
                          </span>
                        </button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {meta && (
            <Pagination
              className="mt-5 sticky bottom-0 bg-white pt-4 z-10"
              aria-label="Sayfa numaraları"
            >
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                    className="cursor-pointer"
                    aria-label="Önceki sayfa"
                  />
                </PaginationItem>

                {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(p);
                        }}
                        className={`${
                          p === page
                            ? "bg-blue-500 text-white"
                            : "text-gray-700"
                        } cursor-pointer`}
                        aria-current={p === page ? "page" : undefined}
                        aria-label={`${p}. sayfaya git`}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < meta.totalPages) setPage(page + 1);
                    }}
                    className="cursor-pointer"
                    aria-label="Sonraki sayfa"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default CollectionsPage;
