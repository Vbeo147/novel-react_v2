export default function WriteForm({
  loading,
  onFileChange,
  onChange,
  onSubmit,
  onClearAttachment,
  attachment,
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
            required
            autoComplete="off"
            ref={titleRef}
          />
        </div>
        <div>
          <input
            onChange={onChange}
            type="text"
            placeholder="내용"
            required
            autoComplete="off"
            ref={textRef}
          />
        </div>
        <div>
          <label htmlFor="ex_file">Picture</label>
          <input
            id="ex_file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>
        {attachment && (
          <div className="components_column">
            <img
              src={attachment}
              width="50px"
              height="50px"
              style={{
                marginBottom: "12px",
              }}
              alt=""
            />
            <button
              className="components_form_input_submit"
              onClick={onClearAttachment}
            >
              Clear
            </button>
          </div>
        )}
        <div>
          <button type="submit" disabled={loading}>
            Enter
          </button>
          <button type="button" onClick={onHome}>
            Close
          </button>
        </div>
      </form>
    </>
  );
}
