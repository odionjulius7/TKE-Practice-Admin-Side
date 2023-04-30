import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createTripItinerary } from "../../Features/Trip/tripSlice";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";

type Props = { id: any };

const ItineraryTab = ({ id }: Props) => {
  const tripStatus = useAppSelector((state) => state.trips.status);
  const [editorData, setEditorData] = useState(
    "<div><p>Initial content</p><p>type here...</p></div>"
  );

  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    try {
      //   if (title.length === 0 ) return;
      const data: string = editorData;

      await dispatch(createTripItinerary({ data, id }));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack sx={{ padding: "1rem", minHeight: "200px" }}>
      <div style={{ minHeight: "150px" }}>
        {" "}
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onReady={(editor) => {
            // You can store the editor instance and use it later.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
          // style={{ height: "350px" }}
        />
        <Button onClick={handleSubmit}>
          {tripStatus ? "loading..." : "submit"}
        </Button>
      </div>
    </Stack>
  );
};

export default ItineraryTab;
