import { SLIDES } from "./slides";

export const PrintView = () => {
  return (
    <div className="print-view">
      {SLIDES.map((Slide, i) => (
        <div key={i} className="print-slide-container">
          <Slide />
        </div>
      ))}
    </div>
  );
};

export default PrintView;
