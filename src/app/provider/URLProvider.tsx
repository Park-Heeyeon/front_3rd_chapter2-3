import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

interface URLContextProps {
  params: Record<string, string | number | undefined>
  setParams: (
    params: (prevParams: Record<string, string | number | undefined>) => Record<string, string | number | undefined>,
  ) => void
}

const URLContext = createContext<URLContextProps | undefined>(undefined)

export const URLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const initialParams = new URLSearchParams(location.search)
  const [params, setParams] = useState<Record<string, string | number | undefined>>({
    skip: parseInt(initialParams.get("skip") || "0"),
    limit: parseInt(initialParams.get("limit") || "10"),
    sortBy: initialParams.get("sortBy") || "",
    sortOrder: initialParams.get("sortOrder") || "asc",
    search: initialParams.get("search") || "",
    tag: initialParams.get("tag") || "",
  })

  const updateURL = () => {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      if (params[key] !== undefined) {
        searchParams.set(key, params[key].toString())
      }
    }
    navigate(`?${searchParams.toString()}`)
  }

  const { skip, limit, sortBy, sortOrder, tag } = params

  useEffect(() => {
    if (tag) {
      //   fetchPostsByTag(params.tag as string)
    } else {
      //   fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, tag])

  // location.search가 변경될 때 params 업데이트
  useEffect(() => {
    const newParams = new URLSearchParams(location.search)
    setParams((prev) => ({
      ...prev,
      skip: parseInt(newParams.get("skip") || "0"),
      limit: parseInt(newParams.get("limit") || "10"),
      search: newParams.get("search") || "",
      sortBy: newParams.get("sortBy") || "",
      sortOrder: newParams.get("sortOrder") || "asc",
      tag: newParams.get("tag") || "",
    }))
  }, [location.search])

  return <URLContext.Provider value={{ params, setParams }}>{children}</URLContext.Provider>
}

export const useURL = (): URLContextProps => {
  const context = useContext(URLContext)
  if (!context) throw new Error("useURL must be used within a URLProvider")
  return context
}
