function projectSettingToJSON()
{
      return {
            bitsPerChannel:        app.project.bitsPerChannel,
            displayStartFrame:     app.project.displayStartFrame,
            gpuAccelType:          app.project.gpuAccelType,
            linearBlending:        app.project.linearBlending,
            timeDisplayType:       app.project.timeDisplayType,
            workingGamma:          app.project.workingGamma,
            workingSpace:          app.project.workingSpace,
            linearizeWorkingSpace: app.project.linearizeWorkingSpace,
            expressionEngine:      app.project.expressionEngine
      }
}
