 
 
 
### @minecraft/server
 
 
## Block
 
-   below 
-   canContainLiquid 
-   dimension 
-   getComponent 
-   getItemStack 
-   isAir 
-   isLiquid 
-   isSolid 
-   isValid 
-   isWaterlogged 
-   location 
-   offset 
-   permutation 
-   setPermutation 
-   setType 
-   setWaterlogged 
-   typeId 
-   y 
 
## BlockEvent
 
-   block 
-   dimension 
 
## BlockInventoryComponent
 
-   container 
 
## BlockPermutation
 
-   getAllStates 
-   matches 
-   resolve 
-   type 
-   withState 
 
## BlockRaycastHit
 
-   block 
 
## BlockStates
 
-   get 
-   getAll 
 
## BlockStateType
 
-   id 
-   validValues 
 
## BlockType
 
-   id 
 
## BlockTypes
 
-   get 
-   getAll 
 
## Camera
 
-   fade 
-   setCamera 
 
## ChatSendAfterEvent
 
-   message 
-   sender 
 
## ChatSendBeforeEvent
 
-   cancel 
 
## ChatSendBeforeEventSignal
 
-   subscribe 
 
## Container
 
-   addItem 
-   clearAll 
-   emptySlotsCount 
-   getItem 
-   getSlot 
-   setItem 
-   size 
 
## ContainerSlot
 
-   amount 
-   getDynamicProperty 
-   getDynamicPropertyIds 
-   getItem 
-   getLore 
-   hasItem 
-   isStackable 
-   isValid 
-   nameTag 
-   setDynamicProperty 
-   setItem 
-   setLore 
-   typeId 
 
## DataDrivenEntityTriggerAfterEvent
 
-   entity 
 
## DataDrivenEntityTriggerAfterEventSignal
 
-   subscribe 
 
## Dimension
 
-   createExplosion 
-   getBlock 
-   getBlockFromRay 
-   getEntities 
-   getPlayers 
-   heightRange 
-   id 
-   playSound 
-   runCommand 
-   setBlockPermutation 
-   setBlockType 
-   spawnEntity 
-   spawnItem 
-   spawnParticle 
 
## Direction
 
-   Down 
 
## EasingType
 
-   Linear 
-   OutCubic 
 
## Effect
 
-   typeId 
 
## Enchantment
 
-   level 
-   type 
 
## EnchantmentType
 
-   id 
-   maxLevel 
 
## Entity
 
-   addEffect 
-   addTag 
-   applyDamage 
-   applyImpulse 
-   applyKnockback 
-   dimension 
-   getBlockFromViewDirection 
-   getComponent 
-   getComponents 
-   getDynamicProperty 
-   getEffect 
-   getEffects 
-   getEntitiesFromViewDirection 
-   getHeadLocation 
-   getProperty 
-   getRotation 
-   getTags 
-   getVelocity 
-   getViewDirection 
-   hasTag 
-   id 
-   isOnGround 
-   isSneaking 
-   isValid 
-   kill 
-   location 
-   matches 
-   nameTag 
-   remove 
-   removeEffect 
-   removeTag 
-   runCommand 
-   setDynamicProperty 
-   setProperty 
-   setRotation 
-   teleport 
-   triggerEvent 
-   typeId 
 
## EntityAttributeComponent
 
-   currentValue 
-   defaultValue 
-   effectiveMax 
-   resetToMaxValue 
-   setCurrentValue 
 
## EntityDamageCause
 
-   entityAttack 
-   entityExplosion 
-   fireTick 
-   fireworks 
-   magic 
-   projectile 
 
## EntityDamageSource
 
-   cause 
-   damagingEntity 
-   damagingProjectile 
 
## EntityDieAfterEvent
 
-   deadEntity 
 
## EntityDieAfterEventSignal
 
-   subscribe 
-   unsubscribe 
 
## EntityEquippableComponent
 
-   getEquipment 
-   getEquipmentSlot 
-   setEquipment 
 
## EntityHurtAfterEvent
 
-   damage 
-   damageSource 
-   hurtEntity 
 
## EntityHurtAfterEventSignal
 
-   subscribe 
 
## EntityItemComponent
 
-   itemStack 
 
## EntityNpcComponent
 
-   name 
-   skinIndex 
 
## EntityProjectileComponent
 
-   owner 
-   shoot 
 
## EntityRaycastHit
 
-   entity 
 
## EntitySpawnAfterEvent
 
-   entity 
 
## EntitySpawnAfterEventSignal
 
-   subscribe 
 
## EquipmentSlot
 
-   Chest 
-   Feet 
-   Head 
-   Legs 
-   Mainhand 
-   Offhand 
 
## ExplosionAfterEvent
 
-   getImpactedBlocks 
-   source 
 
## ExplosionBeforeEvent
 
-   cancel 
-   setImpactedBlocks 
 
## ExplosionBeforeEventSignal
 
-   subscribe 
 
## GameMode
 
-   adventure 
-   creative 
-   spectator 
-   survival 
 
## global
 
-   Container 
-   ContainerSlot 
-   Dimension 
-   Entity 
-   GameMode 
-   ItemStack 
-   ItemType 
-   Player 
-   PlayerJoinAfterEvent 
-   PlayerSpawnAfterEvent 
-   RawMessage 
-   RawText 
-   ScreenDisplay 
-   System 
-   TitleDisplayOptions 
-   Vector3 
-   World 
-   WorldAfterEvents 
 
## ItemDurabilityComponent
 
-   damage 
-   maxDurability 
 
## ItemEnchantableComponent
 
-   addEnchantment 
-   addEnchantments 
-   getEnchantment 
-   getEnchantments 
-   removeAllEnchantments 
-   removeEnchantment 
 
## ItemLockMode
 
-   inventory 
-   slot 
 
## ItemStack
 
-   amount 
-   clone 
-   getCanDestroy 
-   getCanPlaceOn 
-   getComponent 
-   getDynamicProperty 
-   getDynamicPropertyIds 
-   getLore 
-   isStackable 
-   isStackableWith 
-   keepOnDeath 
-   lockMode 
-   nameTag 
-   setCanDestroy 
-   setCanPlaceOn 
-   setDynamicProperty 
-   setLore 
-   typeId 
 
## ItemType
 
-   id 
 
## ItemTypes
 
-   get 
-   getAll 
 
## ItemUseAfterEvent
 
-   itemStack 
-   source 
 
## ItemUseAfterEventSignal
 
-   subscribe 
 
## ItemUseBeforeEvent
 
-   cancel 
 
## ItemUseBeforeEventSignal
 
-   subscribe 
 
## LiquidType
 
-   Water 
 
## MolangVariableMap
 
-   setColorRGBA 
-   setVector3 
 
## Player
 
-   addExperience 
-   addLevels 
-   camera 
-   getGameMode 
-   getTotalXp 
-   isFlying 
-   level 
-   name 
-   onScreenDisplay 
-   playSound 
-   resetLevel 
-   selectedSlotIndex 
-   sendMessage 
-   setGameMode 
-   spawnParticle 
 
## PlayerBreakBlockAfterEvent
 
-   brokenBlockPermutation 
-   player 
 
## PlayerBreakBlockAfterEventSignal
 
-   subscribe 
 
## PlayerBreakBlockBeforeEvent
 
-   cancel 
-   itemStack 
-   player 
 
## PlayerBreakBlockBeforeEventSignal
 
-   subscribe 
 
## PlayerInteractWithBlockAfterEvent
 
-   itemStack 
-   player 
 
## PlayerInteractWithBlockAfterEventSignal
 
-   subscribe 
 
## PlayerInteractWithBlockBeforeEvent
 
-   block 
-   cancel 
-   isFirstEvent 
-   itemStack 
-   player 
 
## PlayerInteractWithBlockBeforeEventSignal
 
-   subscribe 
 
## PlayerInteractWithEntityAfterEvent
 
-   player 
-   target 
 
## PlayerInteractWithEntityAfterEventSignal
 
-   subscribe 
 
## PlayerInteractWithEntityBeforeEvent
 
-   cancel 
-   player 
-   target 
 
## PlayerInteractWithEntityBeforeEventSignal
 
-   subscribe 
 
## PlayerJoinAfterEventSignal
 
-   subscribe 
 
## PlayerLeaveAfterEventSignal
 
-   subscribe 
 
## PlayerLeaveBeforeEvent
 
-   player 
 
## PlayerLeaveBeforeEventSignal
 
-   subscribe 
 
## PlayerPlaceBlockAfterEventSignal
 
-   subscribe 
 
## PlayerPlaceBlockBeforeEvent
 
-   cancel 
-   player 
 
## PlayerPlaceBlockBeforeEventSignal
 
-   subscribe 
 
## PlayerSpawnAfterEvent
 
-   initialSpawn 
-   player 
 
## PlayerSpawnAfterEventSignal
 
-   subscribe 
-   unsubscribe 
 
## RawMessage
 
-   rawtext 
-   text 
-   translate 
-   with 
 
## RawText
 
-   rawtext 
 
## Scoreboard
 
-   addObjective 
-   getObjective 
-   getObjectives 
-   removeObjective 
 
## ScoreboardIdentity
 
-   displayName 
-   type 
 
## ScoreboardIdentityType
 
-   FakePlayer 
 
## ScoreboardObjective
 
-   addScore 
-   displayName 
-   getParticipants 
-   getScore 
-   getScores 
-   id 
-   removeParticipant 
-   setScore 
 
## ScoreboardScoreInfo
 
-   participant 
-   score 
 
## ScreenDisplay
 
-   getHiddenHudElements 
-   hideAllExcept 
-   isForcedHidden 
-   resetHudElements 
-   setActionBar 
-   setHudVisibility 
-   setTitle 
-   updateSubtitle 
 
## ScriptEventCommandMessageAfterEvent
 
-   id 
-   message 
-   sourceType 
 
## ScriptEventCommandMessageAfterEventSignal
 
-   subscribe 
 
## ScriptEventSource
 
-   Server 
 
## StartupBeforeEventSignal
 
-   subscribe 
 
## Structure
 
-   getBlockPermutation 
 
## StructureManager
 
-   createFromWorld 
-   delete 
-   get 
-   getWorldStructureIds 
-   place 
 
## StructureMirrorAxis
 
-   None 
-   X 
-   XZ 
-   Z 
 
## StructureRotation
 
-   None 
-   Rotate180 
-   Rotate270 
-   Rotate90 
 
## StructureSaveMode
 
-   Memory 
-   World 
 
## System
 
-   afterEvents 
-   beforeEvents 
-   clearRun 
-   run 
-   runInterval 
-   runJob 
-   runTimeout 
 
## SystemAfterEvents
 
-   scriptEventReceive 
 
## SystemBeforeEvents
 
-   startup 
-   watchdogTerminate 
 
## TimeOfDay
 
-   Day 
 
## TitleDisplayOptions
 
-   fadeInDuration 
-   fadeOutDuration 
-   stayDuration 
-   subtitle 
 
## Vector2
 
-   x 
-   y 
 
## Vector3
 
-   x 
-   y 
-   z 
 
## WatchdogTerminateBeforeEvent
 
-   cancel 
-   terminateReason 
 
## WatchdogTerminateBeforeEventSignal
 
-   subscribe 
 
## World
 
-   afterEvents 
-   beforeEvents 
-   gameRules 
-   getAllPlayers 
-   getDimension 
-   getDynamicProperty 
-   getPlayers 
-   scoreboard 
-   sendMessage 
-   setDefaultSpawnLocation 
-   setDynamicProperty 
-   setTimeOfDay 
-   structureManager 
 
## WorldAfterEvents
 
-   dataDrivenEntityTrigger 
-   entityDie 
-   entityHurt 
-   entitySpawn 
-   itemUse 
-   playerBreakBlock 
-   playerInteractWithEntity 
-   playerJoin 
-   playerLeave 
-   playerPlaceBlock 
-   playerSpawn 
-   worldLoad 
 
## WorldBeforeEvents
 
-   chatSend 
-   explosion 
-   itemUse 
-   playerBreakBlock 
-   playerInteractWithBlock 
-   playerInteractWithEntity 
-   playerLeave 
-   playerPlaceBlock 
 
## WorldLoadAfterEventSignal
 
-   subscribe 
 
