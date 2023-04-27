task :execute_background_tasks do
  BackgroundTask.execute_rules
end