import { SetStateAction, useState } from "react";

import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/assets/other/spinner";
import { toast } from "@/components/ui/use-toast";
import { addUserComment } from "@/lib/actions/misc.action";
import { UserCommentType, SalonCommentsType } from "../salonType";
import EmotesToogle from "@/components/messages/chat-assets/inputs/emotes";
export default function UserComment({
  userId,
  salonId,
  userComment,
  setSalon,
}: {
  userId: string;
  salonId: string;
  userComment: UserCommentType | undefined;
  setSalon: React.Dispatch<SetStateAction<SalonCommentsType | null>>;
}) {
  const [userRating, setUserRating] = useState<number | null | undefined>(
    userComment?.rating
  );
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>(userComment?.comment || "");
  const [loading, setLoading] = useState<boolean>(false);
  const handleComment = async () => {
    if (loading || comment == userComment?.comment) return;
    if (comment.length < 5) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: "Comment should be more than 5 character",
      });
    }
    setLoading(true);
    try {
      const res = await addUserComment({
        userId: userId,
        barberId: salonId,
        userComment: comment,
        rating: userRating as number,
      });
      if (res.success) {
        setSalon((prev: any) => {
          const findComment = prev?.comments.find(
            (comment: any) => comment.user.id === userId
          );
          if (!findComment) return prev;
          const newData = prev?.comments.map((comment: any) => {
            if (comment.user.id === userId) {
              return { ...comment, stars: userRating, comment: comment };
            } else {
              return comment;
            }
          });
          return newData;
        });
        setLoading(false);
        setComment("")
        toast({
          variant: "success",
          title: "Added",
          description: "Your comment has benn added",
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add comment,try again later",
      });
    }
  };
  return (
    <div className="w-full max-w-[760px]">
      <div className="bg-black/40 border border-white/6 rounded-2xl p-4 shadow-sm">
        <div className="flex items-start gap-4">
          <div>
            <Rating
              name="hover-feedback"
              value={userRating}
              precision={0.5}
              onChange={(event, newValue) => setUserRating(newValue)}
              onChangeActive={(event, newHover) => setHover(newHover)}
              className="!text-white !text-3xl"
              emptyIcon={
                <StarIcon
                  className="!text-white/40 !text-3xl"
                  style={{ opacity: 0.55 }}
                  fontSize="inherit"
                />
              }
            />
            <div className="text-sm text-white/60 mt-1">
              {hover > 0 ? hover : userRating}
            </div>
          </div>

          <div className="flex-1">
            <textarea
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full !bg-black
               text-white resize-none p-3 rounded-xl min-h-[84px] focus-visible:outline-none border border-white/6"
              rows={4}
              placeholder="Share your experience..."
              maxLength={255}
            />

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <EmotesToogle setUserInput={setComment} />
                <p className="text-xs text-white/50">{comment.length}/255</p>
              </div>

              <div>
                <Button
                  className="bg-amber-400 text-black font-medium px-4 py-2 rounded-full"
                  disabled={
                    loading ||
                    comment.length < 5 ||
                    comment == userComment?.comment
                  }
                  onClick={handleComment}
                >
                  {loading ? <LoadingAnimation /> : "Comment"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
