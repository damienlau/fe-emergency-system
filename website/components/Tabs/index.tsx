import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { Badge, TabPane, Tabs } from "ant-design-vue";
import { formItemProps } from "components/Form";

export interface tabPaneProps {
  alias?: string;
  label?: string;
  key?: string | number;
  count?: number;
  form?: formItemProps[];
}

export interface tabPaneClickEventProps {
  activeKey?: string | number;
  item?: tabPaneProps;
}

export default defineComponent({
  name: "Tabs",
  props: {
    center: { type: Boolean, required: false, default: false },
    columns: { type: Object as PropType<tabPaneProps[]>, required: true },
  },
  emits: ["click"],
  setup(props, { slots, emit }) {
    const tabActiveKey = ref(props.columns[0].key);
    const tabNavbarCenterClasses = computed(() => {
      return {
        "ant-tabs-nav-center h-full rounded": props.center,
      };
    });

    const handleClick = (activeKey = tabActiveKey.value) => {
      let selectedTabPane = props.columns.find((row: tabPaneProps) => {
        return row.key === activeKey;
      });

      emit("click", { activeKey, item: selectedTabPane });
    };

    onMounted(() => {
      handleClick();
    });

    return () => (
      <Tabs
        class={tabNavbarCenterClasses.value}
        defaultActiveKey={tabActiveKey.value}
        animated={false}
        onChange={handleClick}
      >
        {{
          default: () => {
            return props.columns.map((row: tabPaneProps) => {
              return (
                <TabPane key={row.key}>
                  {{
                    default: () => (
                      <section class="h-full overflow-hidden">
                        {slots.default?.()}
                      </section>
                    ),
                    tab: () => (
                      <Badge
                        count={row.count}
                        overflowCount={999}
                        offset={[16, 0]}
                      >
                        {row.label}
                      </Badge>
                    ),
                  }}
                </TabPane>
              );
            });
          },
          tabBarExtraContent: () => slots.extra?.(),
        }}
      </Tabs>
    );
  },
});
