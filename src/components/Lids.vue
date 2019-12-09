<template>
  <div class="Lids">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <mdb-card wide>
            <mdb-view
              gradient="aqua"
              class="py-2 px-2 d-flex align-items-center justify-content-between"
              cascade
            >
              <h2 class="card-header-title text-white">Лиды</h2>

              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  v-model="status"
                  class="custom-control-input"
                  id="customSwitch1"
                  checked
                />
                <label class="white-text custom-control-label" for="customSwitch1">Статус</label>
              </div>
            </mdb-view>
            <mdb-card-body cascade>
              <mdb-card-text>
                <mdb-list-group>
                  <div v-for="(lid, index) in liidsResponse" :key="index">
                    <mdb-list-group-item
                      tag="a"
                      href="#"
                      v-if="lid.status === (status ? `unreaded` : `readed`)"
                    >
                      <div class="d-flex justify-content-between w-100">
                        <div class="text-center w-100">
                          <h5 class="mb-1">{{status ? `Новый лид` : `Прочитанный лид`}}</h5>
                          <a class="mt-2">{{lid.contact}}</a>
                        </div>
                        <div>
                          <div>
                            <p class="m-0 p-0">{{$moment.unix(index/1000).format("hh:mm DD.MM.YY")}}</p>

                            <mdb-btn
                              class="btn-dribbble"
                              @click="sendReaded(lid, index)"
                              icon="eye"
                              far
                              size="sm"
                            />
                          </div>
                        </div>
                      </div>
                    </mdb-list-group-item>
                  </div>
                  <hr />
                  <p class="mt-3">Все лиды обработаны</p>
                </mdb-list-group>
              </mdb-card-text>
            </mdb-card-body>
          </mdb-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  mdbRow,
  mdbBtn,
  mdbBtnGroup,
  mdbCol,
  mdbListGroup,
  mdbListGroupItem,
  mdbCard,
  mdbCardImage,
  mdbCardHeader,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
  mdbCardUp,
  mdbCardAvatar,
  mdbCardGroup,
  mdbView,
  mdbMask,
  mdbIcon
} from "mdbvue";
import firebase from "firebase";

export default {
  name: "Lids",
  data() {
    return { status: true, liidsResponse: null };
  },
  mounted() {
    this.getLids();
  },
  updated() {
    this.getLids();
  },
  methods: {
    getLids() {
      let self = this;
      firebase
        .database()
        .ref("lids/")
        .once("value", snapshot => {
          let data = snapshot.val();
          self.liidsResponse = data;
        });
    },
    sendReaded(lid, index) {
      firebase
        .database()
        .ref("lids/" + index)
        .set({
          status: `readed`,
          contact: lid.contact
        });
    }
  },
  computed: {
    // lids() {
    //   return firebase
    //     .database()
    //     .ref("lids/")
    //     .once("value", snapshot => {
    //       let data = snapshot.val();
    //       return [data];
    //     });
    // }
  },
  components: {
    mdbBtn,
    mdbBtnGroup,
    mdbRow,
    mdbCol,
    mdbListGroup,
    mdbListGroupItem,
    mdbCard,
    mdbCardImage,
    mdbCardHeader,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbCardFooter,
    mdbCardUp,
    mdbCardAvatar,
    mdbCardGroup,
    mdbView,
    mdbMask,
    mdbIcon
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-weight: normal;
  padding-top: 20px;
  padding-bottom: 30px;
}
p {
  color: #969696;
  margin-bottom: 0;
  font-size: 14px;
}
</style>
