import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { CommentsType } from "../salonType";

export default function AllComment({ comments }: { comments: CommentsType[] }) {
  if (!comments || comments.length === 0){
    return (
      <div className="text-center text-white/60 py-8">No comments yet.</div>
    );
}
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-2">
      {comments.map((comment, index) => {
        const { user } = comment;
        return (
          <article
            key={comment.id + index}
            className="bg-black/40 border border-white/6 rounded-xl w-full p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Image
                  src={user.image ?? "/profile.jpg"}
                  alt={`${user.name} profile picture`}
                  width={56}
                  height={56}
                  className="rounded-full object-cover w-[56px] h-[56px]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <p className="text-sm font-semibold text-white/90 truncate">
                      {user.name}
                    </p>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <StarIcon className="text-white/60 !text-sm" />
                      <span className="text-white/80">{comment.stars}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-white/80 break-words">
                  {comment.comment}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
