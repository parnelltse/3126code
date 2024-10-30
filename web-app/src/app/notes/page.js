import { createClient } from "@/utils/supabase/server";
import { isDynamicMetadataRoute } from "next/dist/build/analysis/get-page-static-info";

export default async function Notes() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
