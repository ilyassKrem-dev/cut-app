import CaptchaWrapper from "@/assets/wrappers/CaptchaWrapper";

import FormulaLogin from "@/components/forms/formulaLogin";

export default function Page() {


    return (
        <div className="md:h-screen md:flex md:justifty-center md:items-center">
            <CaptchaWrapper>
                <FormulaLogin />
            </CaptchaWrapper>

        </div>
    )
}