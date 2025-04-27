
import SearchComponent from "@/components/shared/Search"
import { fetchAllSnippets } from "@/lib/actions/snippet.actions"


export default async function SearchPage() {
  
  const allSnippets = await fetchAllSnippets();
  
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Search Music Snippets</h1>
     <SearchComponent allSnippets={allSnippets} />
      
    </div>
  )
}
