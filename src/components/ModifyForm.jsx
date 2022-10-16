export default function ModifyForm({
  onSubmit,
  onChange,
  Value,
  titleRef,
  textRef,
  onHome,
}) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <input
            onChange={onChange}
            type="text"
            placeholder="제목"
            value={Value.title || ""}
            ref={titleRef}
            required
          />
        </div>
        <div>
          <textarea
            onChange={onChange}
            value={Value.text || ""}
            ref={textRef}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">Modify</button>
          <button type="button" onClick={() => onHome()}>
            Close
          </button>
        </div>
      </form>
    </>
  );
}
