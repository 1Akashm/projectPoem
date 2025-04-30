import { create } from "zustand";
import { debounce } from "lodash";

export const signUpStore = create((set, get) => {
  const debouncedSave = debounce((updated) => {
    const { password, ...safeData } = updated;
    localStorage.setItem("signUpData", JSON.stringify(safeData));
  }, 300);
  return {
    showPassword: false,
    formData: {
      name: "",
      email: "",
      password: "",
    },
    setFormData: (name, value) => {
      const updated = { ...get().formData, [name]: value };
      set({ formData: updated });
      debouncedSave(updated);
    },

    toggleShowPassword: () => {
      set((state) => ({ showPassword: !state.showPassword }));
    },
    resetForm: () => {
      set({
        formData: {
          name: "",
          email: "",
          password: "",
        },
      });
    },
    cancelDebounced: () => {
      debouncedSave.cancel();
      localStorage.removeItem("signUpData");
      localStorage.clear();
    },
  };
});

export const VerificationStore = create((set) => ({
  code: Array(6).fill(""),
  setCode: (newCode)=>set({code: newCode}),
  resetCode: () => set({ code: Array(6).fill("") }),
}));


export const storeLogin = create((set,get) =>{
  const debounceLogin = debounce((updated)=> {
    const {password,...safeData} = updated;
    localStorage.setItem("login",JSON.stringify(safeData))
  },300);
  

  return{
    showPassword: false,
    formData:{
      email: "",
      password:""
    },

    setFormData:(name,value)=>{
      const updated = {...get().formData,[name]:value};
      set({formData: updated})
      debounceLogin(updated);
    },

    toggleShowPassword: () => {
      set((state) => ({ showPassword: !state.showPassword }));
    },

    resetFormData:()=>{
      set({
        formData: {
          email:"",
          password:""
        }
      })
    }, 
  }

})