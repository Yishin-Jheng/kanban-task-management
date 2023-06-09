function Skeleton({ times, className }) {
  const loadingBoxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={`skeleton__outer ${className}`}>
          <div className="skeleton__inner" />
        </div>
      );
    });

  return loadingBoxes;
}

export default Skeleton;
