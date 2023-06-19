import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import LinkTool from '@editorjs/link';
import ToggleBlock from 'editorjs-toggle-block';

function editor() {
  const editor = new EditorJS({
    holder: 'editor',
    tools: {
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: 'unordered',
        },
      },
      toggle: {
        class: ToggleBlock,
        inlineToolbar: true,
      },
      code: {
        class: CodeTool,
        config: {
          resize: false,
        },
      },
      linkTool: {
        class: LinkTool,
        config: {
          endpoint: 'https://github.com/editor-js/awesome-editorjs#code', // Your backend endpoint for url data fetching,
        },
      },
    },
  });

  return <div id="editor"></div>;
}

export default editor;
