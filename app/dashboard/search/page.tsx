
import SearchComponent from "@/components/shared/Search"
import { fetchAllSnippets, searchSnippets } from "@/lib/actions/snippet.actions"
import { SearchParamProps } from "@/types";


export default async function SearchPage({ searchParams }: SearchParamProps) {
  
  const searchText = (searchParams?.query as string) || '';

  
  const allSnippets = await searchSnippets(searchText);
  
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Search Music Snippets</h1>
     <SearchComponent allSnippets={allSnippets} />
      
    </div>
  )
}
