<template>
  <div class="container">
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css"
      type="text/css"
      media="screen"
      charset="utf-8"
    />

    <div class="row">
      <div class="col">
        <h1>Создание поста</h1>
        {{content[0].data.title}}
        <b-card
          class="mb-2"
          title="Основная информация"
          sub-title="Загружайте картинки в соотношении сторон согласно требованиям статей"
        >
          <div class="input-group my-3">
            <input
              type="text"
              class="form-control"
              placeholder="Название поста"
              maxlength="25"
              v-model="content[0].data.title"
            />
          </div>
          <div class="input-group my-3">
            <textarea
              type="text"
              class="text-editor form-control"
              v-model="content[0].data.description"
              placeholder="Краткое рубрики"
            />
          </div>
          <b-card-text>
            <input type="file" id="inputImg0" @change="prepareImage()" />
            <hr />
            <h4>Предпросмотр</h4>
            <img src height="200" id="previewImg0" alt="Image preview..." />
          </b-card-text>
        </b-card>
        <b-card v-for="i in content.length-1" class="mb-2" :key="i" title="Дополнение">
          <b-card-text>
            <div v-if="!content[i].type">
              <b-button
                block
                class="my-2"
                @click="putData(i,`shortImg`)"
                variant="warning"
              >Изображение</b-button>
              <b-button block class="my-2" @click="putData(i,`text`)" variant="primary">Блок текста</b-button>
            </div>
            <div v-if="content[i].type === `shortImg`">
              <p>Загружайте картинки в соотношении сторон согласно требованиям статей</p>
              <input type="file" :id="`inputImg`+i" @change="prepareImage(i)" />
              <hr />
              <h4>Предпросмотр</h4>
              <img src height="200" :id="`previewImg`+i" alt="Image preview..." />
            </div>
            <div v-if="content[i].type === `text`">
              <textarea
                type="text"
                :class="`text-editor${i} form-control`"
                v-model="content[i].data"
                placeholder="Краткое рубрики"
              />
            </div>
          </b-card-text>
        </b-card>
        <div class="d-flex justify-content-center">
          <b-button
            class="my-2 rounded"
            @click="increeseCountOfBlocks"
            variant="danger"
          >Добавить блок +</b-button>
          <b-button class="my-2 rounded" @click="sendPost" variant="success">Отправить</b-button>
        </div>
      </div>
      <div class="col">
        <button @click="createEl">test+</button>
        <div id="test"></div>
        {{content}}
      </div>
    </div>
  </div>
</template>

<script src="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/js/medium-editor.min.js"></script>
<script>
import firebase from "firebase";
import { log } from "util";
export default {
  data() {
    return {
      postName: "",
      postDesc: "",
      toastCount: 0,
      file: null,
      img: null,
      buffer: null,
      postMainText: "",
      editor: {},
      content: [
        {
          type: `main`,
          data: {
            title: "",
            description: ""
          }
        }
      ]
    };
  },
  mounted() {
    this.invokeTextEditor();
  },
  methods: {
    invokeTextEditor(i = "") {
      var elements = document.querySelector(".text-editor" + i, {
        placeholder: {
          text: "Введите ваш текст",
          hideOnClick: true
        },
        toolbar: {
          allowMultiParagraphSelection: true,
          buttons: [
            "bold",
            "italic",
            "underline",
            "anchor",
            "h2",
            "h3",
            "quote"
          ],
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: "medium-editor-button-first",
          lastButtonClass: "medium-editor-button-last",
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          align: "center",
          sticky: false,
          updateOnEmptySelection: false
        }
      });
      this.editor[i || `main`] = new MediumEditor(elements);
      console.log(this.editor[i || `main`]);
    },
    createEl() {
      let editor = this.buffer;
      console.log(editor);
      let newNode = document.createElement(`div`);
      newNode.appendChild(editor.elements[0]);
      document.getElementById(`test`).appendChild(newNode);
    },
    makeToast(text) {
      this.$bvToast.toast(`Сообщение`, {
        title: text,
        autoHideDelay: 5000,
        appendToast: true
      });
    },
    sendPost() {
      let self = this;
      for (let i = 0; i < this.content.length; i++) {
        const element = this.content[i];
        if (element.type === "text") {
          let element = document.querySelector(".text-editor" + i || "");
          this.editor[i].getContent();
          this.content[i].data = this.editor[i].serialize();
        } else if (element.type === "main") {
          this.editor[`main`].getContent();
          this.content[0].data.description = this.editor[`main`].serialize();
          console.log(this.content[0].data.description);
        }
      }
      // firebase
      //   .database()
      //   .ref("Posts/" + Date.now())
      //   .set(self.content)
      //   .then(() => {
      //     self.makeToast(`Пост успешно создан`);
      //   });
    },
    putData(i, type) {
      this.$set(this.content[i], "type", type);
      if (type === "text") {
        this.$nextTick(() => {
          this.invokeTextEditor(i);
        });
      }
    },
    increeseCountOfBlocks() {
      this.content.push({ data: "" });
    },
    prepareImage(i = 0) {
      var preview = document.querySelector("#previewImg" + i);
      var file = document.querySelector("#inputImg" + i).files[0];
      var reader = new FileReader();
      let _this = this;
      reader.addEventListener(
        "load",
        function() {
          preview.src = reader.result;
          _this.content[i]["data"]["img"] = reader.result.split("base64,")[1];
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  },
  computed: {
    imgFromFile() {
      return this.file.files ? this.file.files[0] : `Тут файл`;
    }
  }
};
</script>

<style scoped>
.text-editor {
  min-height: 7rem;
}
</style>