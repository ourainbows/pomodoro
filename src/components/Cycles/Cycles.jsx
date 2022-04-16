import "./Cycles.css";

function Cycles({ cyclesCount, quantity }) {
    return (
        <div className="cyclesContainer">
            {[...Array(quantity)].map((_, i) =>
                <div key={i} className={`cycle ${cyclesCount > i ? "active" : "inactive"}`}></div>
            )}
        </div>
    )
}

export default Cycles