import ProductGrid from "@/components/ProductGrid";
import Filters from "@/components/Filters";
import SearchBar from "@/components/Searchbar";
import SortDropdown from "@/components/SortDropDown";
import { fetchProducts } from "@/lib/api";

interface SearchParams {
  category?: string;
  sort?: string;
  search?: string;
  name?: string;
  limit?: string;
  page?: string;
}

interface HomePageProps {
  searchParams?: Promise<SearchParams> | SearchParams;
}

export default async function HomePage(props: HomePageProps) {
  let searchParams: SearchParams = {};

  if (props.searchParams && typeof (props.searchParams as any).then === "function") {
    searchParams = await (props.searchParams as Promise<SearchParams>);
  } else {
    searchParams = props.searchParams as SearchParams || {};
  }

  const {
    category = "",
    sort = "",
    search = "",
    name = "",
    limit = "12",
    page = "1"
  } = searchParams;

  const currentPage = parseInt(page) || 1;
  const productsPerPage = parseInt(limit) || 12;
  const skip = (currentPage - 1) * productsPerPage;

  const { products, total } = await fetchProducts({
    category,
    sort,
    search,
    name,
    limit: productsPerPage.toString(),
    skip: skip.toString()
  });

  const totalProducts = total;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-3 sm:p-4 md:p-6 bg-background min-h-screen">
      {/* Filters */}
      <aside className="lg:w-1/4 hidden lg:block">
        <Filters />
      </aside>

      <div className="lg:w-3/4 w-full">
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Products ({totalProducts})
            {totalProducts > 0 && (
              <span className="text-xs sm:text-sm font-normal text-foreground/70 ml-1 sm:ml-2">
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <SearchBar />
            <SortDropdown />
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="mb-4 lg:hidden">
          <Filters />
        </div>

        {/* No Products Found */}
        {name && products.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-accent/20 rounded-lg mx-2 sm:mx-0">
            <p className="text-base sm:text-lg font-medium text-foreground">
              No products found with name "<span className="font-bold">{name}</span>"
            </p>
            <p className="text-foreground/70 mt-2 text-sm sm:text-base">
              Try a different search term
            </p>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <ProductGrid products={products} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 px-2 sm:px-0">
                {/* Page info */}
                <div className="text-xs sm:text-sm text-foreground/70 hidden xs:block">
                  Showing {skip + 1}-{Math.min(skip + productsPerPage, totalProducts)} of {totalProducts} products
                </div>

                {/* Pagination Buttons */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start items-center">
                  {/* Previous */}
                  <a
                    href={`/?page=${Math.max(1, currentPage - 1)}`}
                    className={`px-3 py-2 rounded-md border text-sm sm:text-base ${
                      currentPage === 1
                        ? "bg-background/50 text-foreground/50 cursor-not-allowed"
                        : "bg-accent text-foreground hover:bg-highlight border-accent"
                    }`}
                  >
                    ← Prev
                  </a>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
                    // Show first, last, current ±1
                    if (num === 1 || num === totalPages || (num >= currentPage - 1 && num <= currentPage + 1)) {
                      return (
                        <a
                          key={num}
                          href={`/?page=${num}`}
                          className={`px-3 py-2 rounded-md border text-sm sm:text-base ${
                            currentPage === num
                              ? "bg-foreground text-background border-foreground"
                              : "bg-background text-foreground hover:bg-accent/50 border-accent"
                          }`}
                        >
                          {num}
                        </a>
                      );
                    } else if (num === currentPage - 2 || num === currentPage + 2) {
                      return (
                        <span key={num} className="px-2 text-foreground/50">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  {/* Next */}
                  <a
                    href={`/?page=${Math.min(totalPages, currentPage + 1)}`}
                    className={`px-3 py-2 rounded-md border text-sm sm:text-base ${
                      currentPage === totalPages
                        ? "bg-background/50 text-foreground/50 cursor-not-allowed"
                        : "bg-accent text-foreground hover:bg-highlight border-accent"
                    }`}
                  >
                    Next →
                  </a>
                </div>

                {/* Mobile page info */}
                <div className="text-xs sm:text-sm text-foreground/70 mt-2 xs:mt-0">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
