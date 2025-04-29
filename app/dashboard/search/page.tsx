
import SearchComponent from "@/components/shared/Search"
import { searchSnippets } from "@/lib/actions/snippet.actions"
import { SearchParamProps } from "@/types";


export default async function SearchPage({ searchParams }: SearchParamProps) {
  
  const searchText = (searchParams?.query as string) || '';
  const page = Number(searchParams?.page) || 1;
  
  const allSnippets = await searchSnippets({
    query:searchText, 
    page,
    limit: 3
  });
  
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Search Music Snippets</h1>
     <SearchComponent totalPages={!Array.isArray(allSnippets) ? allSnippets?.totalPages : 0} page={page} allSnippets={Array.isArray(allSnippets) ? [] : allSnippets?.data} />
      
    </div>
  )
}
