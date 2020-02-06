import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileRename from "filepond-plugin-file-rename";
import Tags from "@yaireo/tagify/dist/react.tagify";

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
  FilePondPluginFileRename
);

class Upload extends React.Component {
  state = {};

  componentDidMount() {
    console.log(this.refs.tags);
    this.refs.tags.tagify.DOM.scope.classList.add("form-control");
    this.refs.tags.tagify.DOM.scope.classList.add("h-100");
  }

  render() {
    return (
      <Card bg="dark" className="my-5 text-light">
        <Card.Header className="bg-primary">Upload meme</Card.Header>
        <Card.Body>
          <Form
            onSubmit={event => {
              event.preventDefault();
              this.submitForm();
            }}
          >
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                ref="title"
                required
              />
            </Form.Group>
            <Form.Group controlId="meme">
              <Form.Label>Meme</Form.Label>
              <FilePond
                ref="pond"
                acceptedFileTypes="image/jpeg, image/png"
                fileRenameFunction={file => `swipememe${file.extension}`}
                imageResizeTargetWidth="500"
                maxFileSize="2MB"
                onaddfile={this.handleAddFile}
                oninit={this.handleInit}
                required
              />
            </Form.Group>
            <input
              type="text"
              ref="meme"
              style={{ display: "none" }}
              required
            />
            <Form.Group controlId="tags">
              <Form.Label>Tags (max. 10)</Form.Label>
              <Tags
                className="tags-elem"
                settings={{ maxTags: 10, placeholder: "Tags" }}
                ref="tags"
              />
            </Form.Group>
            <Button className="mt-2" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }

  handleInit = () => {
    console.log("FilePond instance has initialised", this.refs.pond);
  };

  handleAddFile = async (err, item) => {
    console.log(err, item);
    if (err) {
      console.error(err);
      return;
    }
    try {
      const base64String = item.getFileEncodeBase64String();
      const response = await fetch("http://127.0.0.1:3000/api/v1/upload", {
        method: "POST",
        body: JSON.stringify({
          id: item.id,
          name: item.filename,
          nameWithoutExtension: item.filenameWithoutExtension,
          type: item.fileType,
          extension: item.fileExtension,
          size: item.fileSize,
          metadata: item.getMetadata(),
          data: base64String
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-type": "application/json"
        }
      });

      if (response.ok) {
        this.refs.meme.value = await response.text();
      }
    } catch (err) {
      console.error(err);
    }
  };

  submitForm = async () => {
    console.log(
      "ref",
      this.refs.tags.tagify.value.map(tag => tag.value)
    );
    try {
      const response = await fetch("http://localhost:3000/api/v1/meme", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: this.refs.title.value,
          imageSrc: this.refs.meme.value,
          tags: this.refs.tags.tagify.value.map(tag => tag.value)
        })
      });
      if (response.ok) {
        this.props.history.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
}

export default Upload;
