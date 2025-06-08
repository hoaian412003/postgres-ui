import { ITab } from '@/components/Tabs';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'



export const useTabsStore = create<{
  tabs: ITab[];
  currentTabIndex: number;
  autoIncrementId: number;
  getCurrentTab: () => ITab;
  setCurrentTabIndex: (index: number) => void;
  addTab: (tab: ITab) => void;
  addSqlScriptTab: () => void;
  removeTab: (index: number) => void;
  updateSqlScript: (index: number, content: string) => void;
  upsertTableDetailTab: (table: string) => void;
}>()(
  persist(
    (set, get) => ({
      tabs: [{
        title: 'Overview',
        Icon: 'Overview',
        deletable: false,
      }] as ITab[],
      currentTabIndex: 0,
      autoIncrementId: 0,
      addTab: (tab: ITab) => {
        set((state) => ({
          tabs: [...state.tabs, tab],
          currentTabIndex: state.tabs.length,
        }));
      },
      addSqlScriptTab: () => {
        const newTab: ITab = {
          title: `SQL Script ${get().autoIncrementId + 1}`,
          Icon: 'SQL',
          deletable: true,
          content: "",
        };
        set((state) => ({
          tabs: [...state.tabs, newTab],
          autoIncrementId: state.autoIncrementId + 1,
        }));
      },
      removeTab: (index: number) => {
        set((state) => {
          const newTabs = state.tabs.filter((_, i) => i !== index);
          return {
            tabs: newTabs,
            currentTabIndex: Math.max(0, Math.min(state.currentTabIndex, newTabs.length - 1)),
          };
        });
      },
      setCurrentTabIndex: (index: number) => {
        set({ currentTabIndex: index, });
      },
      getCurrentTab: () => {
        const { tabs, currentTabIndex } = get();
        return tabs[currentTabIndex] || tabs[0];
      },
      updateSqlScript(index, content) {
        set(state => ({
          tabs: state.tabs.map((t, i) => {
            if (index === i) {
              return {
                ...t,
                content
              }
            } else return t
          })
        }))
      },
      upsertTableDetailTab(tableName: string) {
        if (!get().tabs.find((t) => t.title === tableName)) {
          set((state) => ({
            tabs: [...state.tabs, {
              title: tableName,
              Icon: 'Table',
              deletable: true
            }],
            currentTabIndex: state.tabs.length,
          }));
        }
      }
    }),
    {
      name: 'tabs-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
