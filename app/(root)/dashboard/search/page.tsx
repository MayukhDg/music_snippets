
import SearchComponent from "@/components/shared/Search"
import { searchSnippets } from "@/lib/actions/snippet.actions"
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import { currentUser } from "@clerk/nextjs/server";


export default async function SearchPage({ searchParams }: SearchParamProps) {
  
  const searchText = (searchParams?.query as string) || '';
  const page = Number(searchParams?.page) || 1;
  const user = await currentUser()
   const mongoUser = await getUserByClerkId(user?.id as string)
  

  const allSnippets = await searchSnippets({
    query:searchText, 
    page,
    limit: 3
  });
  
  return (
    <div className="grid gap-6 p-5">
      <h1 className="text-3xl font-bold tracking-tight">Search Music Snippets</h1>
     <SearchComponent mongoUser={mongoUser} totalPages={!Array.isArray(allSnippets) ? allSnippets?.totalPages : 0} page={page} allSnippets={Array.isArray(allSnippets) ? [] : allSnippets?.data} />
      
    </div>
  )
}
