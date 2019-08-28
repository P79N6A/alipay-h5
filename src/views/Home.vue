<template>
  <div>
    <header class="cube-bar">
      <h1>申请评估</h1>
    </header>
    <section class="cube-content" ref="mfct">
      <!--            <div class="validator-item">-->
      <!--                <cube-input  v-model="text">-->
      <!--                    <div slot="prepend" class="slot-prepend"> 申请姓名 </div>-->
      <!--                </cube-input>-->
      <!--                <cube-validator v-model="valid" :model="text" :rules="rules" :messages="messages" class="line-height-clear"></cube-validator>-->
      <!--            </div>-->
      <!--            <div class="validator-item">-->
      <!--                <cube-input  v-model="msg">-->
      <!--                    <div slot="prepend" class="slot-prepend"> 身份证号 </div>-->
      <!--                </cube-input>-->
      <!--                <cube-validator v-model="valid" :model="msg" :rules="rules" :messages="messages" class="line-height-clear"></cube-validator>-->
      <!--            </div>-->
      <!--            <div class="validator-item">-->
      <!--                <cube-input  v-model="msg">-->
      <!--                    <div slot="prepend" class="slot-prepend"> 手机号码 </div>-->
      <!--                </cube-input>-->
      <!--                <cube-validator v-model="valid" :model="msg" :rules="rules" :messages="messages" class="line-height-clear"></cube-validator>-->
      <!--            </div>-->
      <!--            <div class="validator-item">-->
      <!--                <cube-input  v-model="msg">-->
      <!--                    <div slot="prepend" class="slot-prepend"> 所选车型 </div>-->
      <!--                </cube-input>-->
      <!--                <cube-validator v-model="valid" :model="msg" :rules="rules" :messages="messages" class="line-height-clear"></cube-validator>-->
      <!--            </div>-->
      <cube-form :model="model" @validate="validateHandler" ref="formData" class="cube-form_groups">
        <cube-form-group>
          <cube-form-item v-for="(item, index) in fields" :key="index" :field="item"></cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-button @click="submitHandler">Submit</cube-button>
        </cube-form-group>
      </cube-form>
      <div class="validator-item">
        <cube-input v-model="msg" label='车型'>
          <div slot="prepend" class="slot-prepend">所选车型</div>
        </cube-input>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
  // data () {
  //     return {
  //         text: '',
  //         msg: '',
  //         valid: '',
  //         rules: {
  //             required: true,
  //             // pattern: /didi.com$/,
  //             custom: (val) => {
  //                 return val.length >= 2
  //             }
  //         },
  //         messages: {
  //             // pattern: 'The E-mail suffix need to be didi.com.',
  //             custom: '不能少于两位'
  //         },
  //     }
  // }
  data() {
    return {
      msg: "",
      validity: {},
      valid: undefined,
      model: {
        name: "",
        idCard: "",
        phoneNumber: "",
        vehicleModel: ""
      },
      fields: [
        {
          type: "input",
          modelKey: "name",
          label: "申请姓名",
          props: {
            placeholder: "请输入"
          },
          rules: {
            required: true,
            custom: val => {
              return val.length >= 2;
            }
          },
          messages: {
            custom: "不能少于两位"
          }
        },
        {
          type: "input",
          modelKey: "idCard",
          label: "身份证号",
          props: {
            placeholder: "请输入"
          },
          rules: {
            required: true
          }
        },
        {
          type: "input",
          modelKey: "phoneNumber",
          label: "手机号码",
          props: {
            placeholder: "请输入"
          },
          rules: {
            required: true
          }
        },
        {
          type: "input",
          modelKey: "vehicleModel",
          label: "所选车型",
          props: {
            placeholder: "请选择"
          },
          rules: {
            required: true
          },
          events: {
            focus: this.chooseModel
          }
        }
      ]
    };
  },
  methods: {
    submitHandler() {
      this.$refs.formData.validate();
      console.log("submit");
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      console.log(
        "validity",
        result.validity,
        result.valid,
        result.dirty,
        result.firstInvalidFieldIndex
      );
    },
    chooseModel() {
      this.$router.push("/brand");
    }
  }
};
</script>

<style lang="stylus">
.cube-content {
  margin: 10px;
}

.cube-bar h1 {
  font-size: 16px;
  font-weight: 700;
}

/*
    .slot-prepend
        margin-left 10px;

    .validator-item
        box-sizing border-box;
        min-height 60px;

    .line-height-clear
        line-height 0
     */
</style>