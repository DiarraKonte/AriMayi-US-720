import React, { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { Job } from "../../Slice/jobs/jobInterfaces";
import { postFavorites, deleteFavorites } from "../../Slice/jobs/jobThunks";
import { saveFavoritesToStorage } from "../../localStorage";


interface ToggleFavoriteProps {
  job: Job;
    onClick: (jobId: number) => void; // ✅ Ajouter le paramètre
    isSelected: boolean;

}

const ToggleFavorite: React.FC<ToggleFavoriteProps> = ({ job }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  // Recovers the list of all jobs in the Redux store
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  // find the current job to find out its favorite state
  const currentJob = jobs.find((j) => j.id === job.id);
  const isFavorited = currentJob?.favorite || false;


  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (loading) return;
    setLoading(true);

    try {
      if (isFavorited) {
        //if in already in favorite => delete 
        await dispatch(deleteFavorites({ jobId: job.id })).unwrap();
        console.log("Job retiré des favoris");
      } else {
        // else add in favorite
        await dispatch(postFavorites(job)).unwrap();
        // If Api Success, change persist in Localstorage
        const updatedFavoriteIds = jobs
          .filter((j) => (j.id === job.id ? true : j.favorite))
          .map((j) => j.id);

        saveFavoritesToStorage(updatedFavoriteIds);
        console.log("Job ajouté aux favoris et persisté localement");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }

    setLoading(false);
  };

  return (
    <div onClick={handleToggleFavorite} style={{ cursor: "pointer" }}>
      {isFavorited ? (
        <HeartFilled style={{ color: "#f28c68", fontSize: "16px" }} />
      ) : (
        <HeartOutlined style={{ color: "#f28c68", fontSize: "16px" }} />
      )}
    </div>
  );
};

export default ToggleFavorite;