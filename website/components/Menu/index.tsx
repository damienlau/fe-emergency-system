import { defineComponent, onMounted, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Menu",
  props: {
    // 菜单选项的配置描述
    columns: {
      type: Object,
      required: true,
    },
    // 是否显示菜单外边框
    bordered: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 菜单高度
    height: {
      type: Number,
      required: false,
    },
    // 是否开启路由模式
    routerLink: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["select"],
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const { columns, bordered, height, routerLink } = toRefs(props);
    // 菜单当前激活值
    const menuActiveKey = ref(Array.of(columns.value[0].key));

    // 监听选中菜单项事件
    const handleClickMenuItem = ({ keyPath }) => {
      menuActiveKey.value = keyPath;
      // 激活当前菜单项时以 Key 作为 Name 进行路由跳转
      if (routerLink.value) {
        router.push({ name: keyPath.join() });
      } else {
        emit("select", keyPath);
      }
    };

    onMounted(() => {
      // 检测当前路由位置，如果不在指定页面就跳转到默认路由
      // let currentRoute_ = columns.value.find((routeItem) => {
      //   return routeItem.key == route.name;
      // });
      // handleClickMenuItem({
      //   keyPath: currentRoute_
      //     ? Array.of(currentRoute_["key"])
      //     : menuActiveKey.value,
      // });
    });

    return () => (
      <a-menu
        v-model={[menuActiveKey.value, "selectedKeys"]}
        class={!bordered.value && `border-b-0`}
        class={`leading-${height.value}`}
        mode="horizontal"
        onClick={handleClickMenuItem}
      >
        {columns.value.map((menuItem) => {
          return (
            <a-menu-item key={menuItem.key}>
              <span class="w-96 inline-block text-center text-16 font-medium">
                {menuItem.label}
              </span>
            </a-menu-item>
          );
        })}
      </a-menu>
    );
  },
});
