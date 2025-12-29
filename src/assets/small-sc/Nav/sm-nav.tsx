import SmMainLinks from "./misc/sm-links";
import { auth } from "@/auth";

export default async function SmMainNav() {
  const session = (await auth()) as any;

  // Mobile nav wrapper: subtle glass, sits at bottom on small screens
  const wrapper = (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/40 p-3 z-40">
      <div className="max-w-3xl mx-auto">
        <SmMainLinks />
      </div>
    </nav>
  );

  if (!session) return wrapper;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/40 p-3 z-40">
      <div className="max-w-3xl mx-auto">
        <SmMainLinks isBarber={session.user.isBarber} />
      </div>
    </nav>
  );
}
